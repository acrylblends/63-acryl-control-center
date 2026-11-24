/**
 * The launcher's Host half is the @acryldev/launcher-desktop package (spec 052 T055); this row gives it the two things a Blends frame names differently
 * from the ACRYL runtime the package was written for:
 * - `appInstance.home`: the package lists and makes apps in ACRYL's root (`~/.acryl`), while a Blends frame's `appInstance.home` is this app's own data
 *   folder, so the package runs in a scope whose home is the root the AppInstance family names (`acrylRoot`), never read from the environment here;
 * - `acrylTools`: the package registers its launcher tools through ACRYL's tools port, which the ACRYL runtime answers over DeepSeek Harness's tool
 *   registry (`@acryldev/harness-runtime` engine-tools); this frame has the registry (`tools`, the chat's) and no port, so the same thin delegate is
 *   provided here, to the launcher only (the other plugins that inject `acrylTools` keep waiting for a port, as before).
 */
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import type { AcrylTools } from '@acryldev/control'
import { acrylRoot, personHome } from '@acryldev/instance/storage'
import * as launcher from '@acryldev/launcher-desktop'

export const name = 'acryl-launcher-desktop'
export const inject = ['appInstance', 'router', 'routerHttp', 'tools']

export function apply(ctx: Context): void {
  const home = acrylRoot(process.platform, process.env, personHome(process.env, process.platform))
  const acrylTools: AcrylTools = {
    register: (definition) => ctx.tools.register(defineTool(definition as never)),
    get: (toolName) => ctx.tools.get(toolName) as ReturnType<AcrylTools['get']>,
    execute: (input) => ctx.tools.execute(input as never) as Promise<Awaited<ReturnType<AcrylTools['execute']>>>,
    policy: (handler) => ctx.on('tools/pre-execute', handler as never),
  }
  // A scope of its own for `acrylTools`, provided by a plugin of that scope (a service provided straight from this apply is not seen by the package): the
  // port is a service the package waits for, and no other plugin of the frame sees it.
  const scope = ctx.isolate('acrylTools').extend({ appInstance: { ...ctx.appInstance, home } })
  scope.plugin({
    name: 'acryl-launcher-desktop-tools',
    apply: (inner: Context) => {
      inner.effect(() => {
        const dispose = inner.reflect.provide('acrylTools', acrylTools)
        return () => { void dispose() }
      }, 'acryl-launcher-desktop: acrylTools')
    },
  })
  scope.plugin(launcher)
}
