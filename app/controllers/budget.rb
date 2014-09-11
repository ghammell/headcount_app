get '/' do
  erb :sign_in
end

get '/new_bar' do
  erb :_scroll_bar, layout: false
end

get '/test' do
  erb :test, layout: false
end

get '/sign_in' do

end

get '/users/:user_id' do

  erb :budget
end
