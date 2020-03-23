using Microsoft.AspNetCore.Mvc;
using PeopleSearchApp.DAL;
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
        private readonly PersonContext context;
        public PersonController(PersonContext context)
        {
            this.context = context;
        }
         [HttpGet]
        public List<Person> GetPersons()
        {
            return context.Persons.ToList();
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody]Person person)
        {
            context.Persons.Add(person);
            context.SaveChanges();
            return Ok(new
            { 
                success = true,
                returncode = "200"
            });
        }

    }
}
