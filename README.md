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

## CORS

By default, the Drupal REST API is secured against cross origin resource sharing (CORS) attacks. To get this plugin to work with a Tripal site, you need to configure CORS for your Drupal site as follows:

1. Copy the default services yaml from `web/sites/default/default.services.yml` to `web/sites/default/services.yml` in order to enable default settings for services in your site.
2. Edit the `services.yml` file and find the `cors.config` directive. Keep the settings as secure as possible by limiting the allowed origins as much as possible.

```yml
  # Configure Cross-Site HTTP requests (CORS).
  # Read https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
  # for more information about the topic in general.
  # Note: By default the configuration is disabled.
 cors.config:
   enabled: true
   # Specify allowed headers, like 'x-allowed-header'.
   allowedHeaders: ['content-type']
   # Specify allowed request methods, specify ['*'] to allow all possible ones.
   allowedMethods: ['GET']
   # Configure requests allowed from specific origins.
   allowedOrigins: ['http://localhost:8999']
   # Sets the Access-Control-Expose-Headers header.
   exposedHeaders: false
   # Sets the Access-Control-Max-Age header.
   maxAge: false
   # Sets the Access-Control-Allow-Credentials header.
   supportsCredentials: false
```

## Development

This repo is setup to develop in a Docker container.

Thanks to CORS, you also need a local Tripal site to test this. The following will

1. Build a docker image for the JBrowse plugin
2. Start a docker container for the JBrowse plugin that runs a JBrowse site with tracks using the DrupalRestAuthInternetAccount plugin.
3. Run another docker container hosting a tripal site.

```
git clone https://github.com/tripal/Tripal-JBrowse-InternetAccountPlugin
cd Tripal-JBrowse-InternetAccountPlugin
docker build --tag=jbrowse:internetAccountPlugin ./
docker run -itd -p 9000:9000 -p 8999:8999 --volume=$(pwd):/jbrowse2 --name jbrPlugin jbrowse:internetAccountPlugin
docker run --publish=80:80 --name=t4 -tid tripalproject/tripaldocker:latest
```

Now you can access your JBrowse site running this plugin at http://localhost:8999/ and the Tripal site at http://localhost.

To test the plugin you want to ensure that you can only access the "TripalAuth VCF" and "TripalAuth BigWig" when you are signed into the local Tripal site in another tab. The "NoAuth VCF" and "NoAuth BigWig" will be available regardless of the state of the Tripal site.
