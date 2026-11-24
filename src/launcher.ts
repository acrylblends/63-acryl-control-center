/**
 * The launcher's Host half is the @acryldev/launcher-desktop package (spec 052 T055); this row only tells it where ACRYL's home is. The package lists
 * and makes apps in `appInstance.home`, ACRYL's root (`~/.acryl`), while a Blends frame's `appInstance.home` is this app's own data folder, so the
 * package runs in a scope whose `appInstance.home` is the root, which the AppInstance family names (`acrylRoot`), never read from the environment here.
 */
import type { Context } from '@deepseek-ai/cordis'
import { acrylRoot, personHome } from '@acryldev/instance/storage'
import * as launcher from '@acryldev/launcher-desktop'

export const name = 'acryl-launcher-desktop'
export const inject = ['appInstance', 'router', 'routerHttp']

export function apply(ctx: Context): void {
  const home = acrylRoot(process.platform, process.env, personHome(process.env, process.platform))
  ctx.extend({ appInstance: { ...ctx.appInstance, home } }).plugin(launcher)
}
