using Microsoft.AspNetCore.Mvc;
using PeopleSearchApp.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleSearchApp.Models;

namespace PeopleSearchApp.Controllers
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
            string search = Request.Query["search"];

            //We can etiher return all people when searching with an empty string or none of them
            if (search is null || search == "")
            {
                return new List<Person>();
                //return context.Persons.ToList();
            }
            return context.Persons.Where(p => p.FirstName.Contains(search) || p.LastName.Contains(search)).ToList();
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody]Person person)
        {
            if (person is null)
                return null;

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
