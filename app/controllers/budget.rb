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
  erb :_scroll_bar, layout: false
end

get '/test' do
  erb :test, layout: false
end

get '/users/:user_id' do

  erb :budget
end
