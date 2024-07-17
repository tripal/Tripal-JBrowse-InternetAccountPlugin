import { ConfigurationSchema } from '@jbrowse/core/configuration'
import { Instance } from 'mobx-state-tree'
import { BaseInternetAccountConfig } from '@jbrowse/core/pluggableElementTypes/models'

/**
 * #config DrupalRestAuthModel
 */
function x() { } // eslint-disable-line @typescript-eslint/no-unused-vars

const DrupalRestConfigSchema = ConfigurationSchema(
  'DrupalRestAuthInternetAccount',
  {
    /**
     * #slot
     */
    drupalUri: {
      description: 'The base URL for the Drupal site we want to authenticate against.',
      type: 'string',
      defaultValue: ''
    },
  },
  {
    /**
     * #baseConfiguration
     */
    baseConfiguration: BaseInternetAccountConfig,
    explicitlyTyped: true,
  },
)

export type DrupalRestAuthInternetAccountConfigModel = typeof DrupalRestConfigSchema

export type DrupalRestAuthInternetAccountConfig =
  Instance<DrupalRestAuthInternetAccountConfigModel>
export default DrupalRestConfigSchema
