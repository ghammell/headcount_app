get '/' do
  if session[:errors]
    @invalid_sign_in = session[:errors]
    session[:errors] = false
  end
  erb :sign_in
end

get '/sign_in' do
  @user_test = User.new(email: params[:email], password: params[:password])
  @user = User.find_by(email: params[:email])
  p @user

  if @user == nil && @user_test.valid?
    session[:errors] = {error: "Nope."}
    redirect '/'
  elsif @user != nil && params[:password] == @user.password
    redirect "/users/#{@user.id}"
  elsif @user != nil && params[:password] != @user.password
    session[:errors] = {error: "Nope."}
    redirect '/'
  else
    session[:errors] = @user_test.errors
    redirect '/'
  end
end

get '/sign_up' do
  @user = User.new(params)
  if @user.valid?
    @user.save
    redirect "/users/#{@user.id}"
  end

  @sign_up_errors = @user.errors
  erb :sign_in
end

get '/new_bar' do
  @bar_id = params[:resource_count]
  erb :_scroll_bar, layout: false
end

get '/test' do
  erb :test, layout: false
end

get '/users/:user_id' do
  session[:user_id] = params[:user_id]
  @user = User.find(params[:user_id])
  erb :budget
end

get '/sign_out' do
  session[:user_id] = nil
  redirect '/'
end

post '/save_budget' do
  @user = User.find(session[:user_id])
  @budget = @user.budgets.create(name: params["budget_name"], b_and_t_rate: params["b_and_t_rate"])

  params.each do |key, value|
    if key.include?("resource")
      attributes = value.split("&")
      base_salary = attributes[0].split("=")[1]
      bonus = attributes[1].split("=")[1]
      quantity = attributes[2].split("=")[1]
      @resource = @budget.resources.create(base_salary: base_salary, bonus: bonus, quantity: quantity)

    elsif key.include?("css_left_end")
      @resource.update_attribute(:css_left_end, value)

    elsif key.include?("css_left_start")
      @resource.update_attribute(:css_left_start, value)
    end
  end
  if @budget.id != nil
    erb :budget_link, layout: false, locals: {budget: @budget}
  end
end
