# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Packages to install
  packages = [
    pkgs.nodejs_22
  ];

  # Environment variables
  env = {};

  idx = {
    extensions = [
      "vue.volar"
      "google.gemini-cli-vscode-ide-companion"
    ];

    workspace = {
      # Runs when a workspace is first created with this dev.nix file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";

        # If you want to install eslint-plugin-prettier automatically, add here:
        # eslint-install = "npm install -D eslint-plugin-prettier";
        
        default.openFiles = [ "src/App.vue" ];
      };
    };

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}