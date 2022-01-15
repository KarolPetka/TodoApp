using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using Swashbuckle.AspNetCore.Annotations;
using TodoAppBackend.Models;

namespace TodoAppBackend.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class TodoContext : ControllerBase
    {
        [HttpGet]
        public List<Todo> GetEmployees()
        {
            return DatabaseGet();
        }


        [HttpPut("{id}/{description}")]
        public void PutEmployee(long id, string description)
        {
            Console.WriteLine(description);
            DatabasePut(id, description);
        }

        [HttpPost("{id}/{description}")]
        public void PostEmployee(long id, string description)
        {
            DatabasePost(id, description);
        }

        [HttpDelete("{id}")]
        public void DeleteEmployee(long id)
        {
            DatabaseDelete(id);
        }

        public List<Todo> DatabaseGet()
        {
            List<Todo> todoList = new List<Todo>();
            using(MySqlConnection connection = new MySqlConnection("server=localhost;username=root;database=Todo;port=3306;password=root"))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand("select * from todo", connection);
                MySqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    Todo todo = new Todo();
                    todo.Id = Convert.ToInt64(reader["id"]);
                    todo.Description = reader["description"].ToString();

                    todoList.Add(todo);
                }
                reader.Close();
            }
            return todoList;
        }

        public void DatabaseDelete(long id)
        {
            using (MySqlConnection connection = new MySqlConnection("server=localhost;username=root;database=Todo;port=3306;password=root"))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand("delete from todo where id = " + id, connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
        }

        public void DatabasePut(long id, string description)
        {
            using (MySqlConnection connection = new MySqlConnection("server=localhost;username=root;database=Todo;port=3306;password=root"))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand("update todo set description = \'" + description + "\' where id = " + id, connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
        }

        public void DatabasePost(long id, string description)
        {
            using (MySqlConnection connection = new MySqlConnection("server=localhost;username=root;database=Todo;port=3306;password=root"))
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand("insert into todo values (" + id + ", \'" + description + "\');", connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
        }
    }
}
