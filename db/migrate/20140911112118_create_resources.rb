class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.integer :base_salary
      t.float :bonus
      t.integer :quantity
      t.string :css_left_start
      t.string :css_left_end
      t.timestamps
      t.belongs_to :budget
    end
  end
end
