get '/' do

  erb :budget
end

get '/new_bar' do
  erb :_scroll_bar, layout: false
end

get '/test' do
  erb :test, layout: false
end

get '/refresh' do
	{salary_input: params[:salary_input]}
end