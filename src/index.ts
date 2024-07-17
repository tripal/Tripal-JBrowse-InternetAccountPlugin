import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import ViewType from '@jbrowse/core/pluggableElementTypes/ViewType'
import { AbstractSessionModel, isAbstractMenuManager } from '@jbrowse/core/util'
import { version } from '../package.json'
import { InternetAccountType } from '@jbrowse/core/pluggableElementTypes'
import configSchema from './DrupalRestAuthModel/configSchema'
import modelFactory from './DrupalRestAuthModel/model'

export default class DrupalRestAuthModelPlugin extends Plugin {
  name = 'DrupalRestAuthModelPlugin'
  version = version

  install(pluginManager: PluginManager) {
    console.log('here')
    pluginManager.addInternetAccountType(() => {
      return new InternetAccountType({
        name: 'DrupalRestAuthInternetAccount',
        configSchema,
        stateModel: modelFactory(configSchema),
      })
    })
  }

  configure(pluginManager: PluginManager) {
    if (isAbstractMenuManager(pluginManager.rootModel)) {
      pluginManager.rootModel.appendToMenu('Add', {
        label: 'Hello View',
        onClick: (session: AbstractSessionModel) => {
          session.addView('HelloView', {})
        },
      })
    }
  }
}
