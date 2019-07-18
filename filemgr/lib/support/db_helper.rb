require_relative "./db_helper/connect"
require_relative "./db_helper/seed"
require_relative "./db_helper/global"
require_relative "./db_helper/params"
require_relative "./db_helper/migrate"

module DBHelper
  include DBGlobal
  include DBParams
  include DBSeed
  include DBMigrate
  include DBConnect
end
