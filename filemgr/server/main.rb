class Application < Sinatra::Base
  extend Route

  api = Api.new
  web = Web.new

  set :public_folder, App.public_path

  all "/api" do
    initreq(api)
    api.index
  end

  define :post, "/api/login" do
    initreq(api)
    api.login
  end

  define :post, "/api/register" do
    initreq(api)
    api.register
  end
  
  matchall "/api" do
    initreq(api)
    api.not_found
  end

  matchall do
    initreq(web)
    web.index
  end

  private
  
  def initreq handler
    handler.params = params
  end
end