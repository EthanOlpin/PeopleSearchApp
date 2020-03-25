using Microsoft.AspNetCore.Mvc;
using PeopleSearchApp.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleSearchApp.Models;
using System.Net;

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

        //Param 's': A sample search string used for testing purposes
        [HttpGet]
        public List<Person> GetPersons(string s)
        {
            string search;
            if (s is null)
                search = Request.Query["search"];
            else
                search = s;
            search = search.Replace(" ", "").ToLower();
            //We can etiher return all people when searching with an empty string or none of them
            if (search is null || search == "")
            {
                return new List<Person>();
                //return context.Persons.ToList();
            }
            return context.Persons.Where(p => (p.FirstName + p.LastName).ToLower().Contains(search)).ToList();
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody]Person person)
        {
            if (person is null)
                return new BadRequestResult();

            if (person.FirstName is null ||
                person.LastName is null ||
                person.Birthday == null)
                return new BadRequestResult();

            string[] acceptedImgTypes = { ".png", ".jpg", ".jpeg", ".gif", ".raw" };

            if (person.ImageURL == "" ||
                person.ImageURL is null ||
                //Check if the URL links directly to an image of compatible type
                acceptedImgTypes.Where(s => person.ImageURL.EndsWith(s)).Count() == 0)
                //Set default image url if requested url wasn't added or was invalid
                person.ImageURL = "https://img.icons8.com/ios/100/000000/cat-profile.png";

            context.Persons.Add(person);
            context.SaveChanges();
            return new OkResult();
        }
    }
}