class LoginSeeder < Seeder
  def seed
    Login.create({
      email: "tester@gmail.com",
      password: "password"
    })
  end
end
