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
    tokenType: {
      description: 'a custom name for a token to include in the header',
      type: 'string',
      defaultValue: 'Basic',
    },
    /**
     * #slot
     */
    validateWithHEAD: {
      description: 'validate the token with a HEAD request before using it',
      type: 'boolean',
      defaultValue: true,
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
