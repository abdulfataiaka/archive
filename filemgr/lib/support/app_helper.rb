module AppHelper
  def app_dependency_names
    [
      "bundler/setup",
      "sinatra/base",
      "sinatra/namespace",
      "json",
      "active_record",
      "newrelic_apm"
    ]
  end

  def app_module_paths
    [
      "server/helpers/controller_helper",
      "server/controllers/controller",
      "server/helpers/api_controller_helper.rb",
      "server/controllers/api",
      "server/controllers/web",

      "server/models/login",

      "server/support/params",
      "server/support/route",
      "server/support/response"
    ]
  end
end
