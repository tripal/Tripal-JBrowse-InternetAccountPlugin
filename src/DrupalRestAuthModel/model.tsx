import { ConfigurationReference, getConf } from '@jbrowse/core/configuration'
import { InternetAccount } from '@jbrowse/core/pluggableElementTypes/models'
import { UriLocation } from '@jbrowse/core/util/types'
import { Instance, types, getRoot } from 'mobx-state-tree'

// locals
import { DrupalRestAuthInternetAccountConfigModel } from './configSchema'
import { DrupalRestAuthLoginForm } from './DrupalRestAuthLoginForm'
// import { getResponseError } from '../util'
async function getError(response: Response) {
  try {
    return response.text()
  } catch (e) {
    return response.statusText
  }
}

async function getResponseError({
  response,
  reason,
  statusText,
}: {
  response: Response
  reason?: string
  statusText?: string
}) {
  return [
    `HTTP ${response.status}`,
    reason,
    statusText ?? (await getError(response)),
  ]
    .filter(f => !!f)
    .join(' - ')
}


/**
 * #stateModel DrupalRestAuthInternetAccount
 */
const stateModelFactory = (
  configSchema: DrupalRestAuthInternetAccountConfigModel,
) => {
  return InternetAccount.named('DrupalRestAuthInternetAccount')
    .props({
      /**
       * #property
       */
      type: types.literal('DrupalRestAuthInternetAccount'),
      /**
       * #property
       */
      configuration: ConfigurationReference(configSchema),
    })
    .views(self => ({
      /**
       * #getter
       */
      get validateWithHEAD(): boolean {
        return getConf(self, 'validateWithHEAD')
      },
    }))
    .actions(self => ({
      /**
       * #action
       */
      getTokenFromUser(
        resolve: (token: string) => void,
        reject: (error: Error) => void,
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { session } = getRoot<any>(self)
        session.queueDialog((doneCallback: () => void) => [
          DrupalRestAuthLoginForm,
          {
            internetAccountId: self.internetAccountId,
            handleClose: (token: string) => {
              if (token) {
                resolve(token)
              } else {
                reject(new Error('User cancelled entry'))
              }
              doneCallback()
            },
          },
        ])
      },
      /**
       * #action
       */
      async validateToken(token: string, location: UriLocation) {
        console.log('here!!!:)')
        if (!self.validateWithHEAD) {
          return token
        }
        const newInit = self.addAuthHeaderToInit({ method: 'HEAD' }, token)
        const response = await fetch(location.uri, newInit)
        if (!response.ok) {
          throw new Error(
            await getResponseError({
              response,
              reason: 'Error validating token',
            }),
          )
        }
        return token
      },
    }))
}

export default stateModelFactory
export type DrupalRestAuthStateModel = ReturnType<typeof stateModelFactory>
export type DrupalRestAuthModel = Instance<DrupalRestAuthStateModel>
