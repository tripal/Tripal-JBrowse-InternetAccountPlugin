import React, { useState } from 'react'
import { Button, DialogContent, DialogActions, TextField, Container } from '@mui/material'
import { Dialog } from '@jbrowse/core/ui'

export function DrupalRestAuthLoginForm({
  internetAccountId,
  internetAccountName,
  internetAccountDescription,
  handleClose,
}: {
  internetAccountId: string
  internetAccountName: string
  internetAccountDescription: string
  handleClose: (arg?: string) => void
}) {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  return (
    <Dialog
      open
      maxWidth="xl"
      data-testid="login-DrupalRestAuth"
      title={`${internetAccountName}`}
    >
      <form
        onSubmit={event => {
          handleClose(btoa(`not:needed`))
          event.preventDefault()
        }}
      >
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Container>
            {internetAccountDescription}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
