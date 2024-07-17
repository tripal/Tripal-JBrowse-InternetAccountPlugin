![Integration](https://github.com/tripal/Tripal-JBrowse-InternetAccountPlugin/workflows/Integration/badge.svg?branch=main)

# drupal-rest-auth-model

This JBrowse2 plugin provides a new internet account type to allow you to set specific tracks within a JBrowse as private and requiring that a user be logged into a Tripal/Drupal site. It does not handle logging the user in.

```
               _   _                 _____                 _                                  _
     /\       | | (_)               |  __ \               | |                                | |
    /  \   ___| |_ ___   _____      | |  | | _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_
   / /\ \ / __| __| \ \ / / _ \     | |  | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|
  / ____ \ (__| |_| |\ V /  __/     | |__| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_
 /_/    \_\___|\__|_| \_/ \___|     |_____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|
                                                                  | |
                                                                  |_|
```

## Development

This repo is setup to develop in a Docker container.

```
docker build --tag=jbrowse:internetAccountPlugin ./
docker run -itd -p 9000:9000 -p 8999:8999 --volume=$(pwd):/jbrowse2 --name jbrPlugin jbrowse:internetAccountPlugin
```

Now you can access your JBrowse site running this plugin at http://localhost:8999/.
