using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Models;

namespace Test.Controllers
{
    [Route("Person")]
    [Produces("application/json")]
    public class PersonController : Controller
    {
         public static List<Person> people = new List<Person> { new Person { Name = "dave", Birthday = new DateTime(2000, 6, 1, 0, 0, 0), ImageURL = "" } };
         [HttpGet]
         public List<Person> GetPersons()
        {
            return people;
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody]Person person)
        {
            people.Add(person);
            return Ok(new
            { 
                success = true,
                returncode = "200"
            });
        }

    }
}
