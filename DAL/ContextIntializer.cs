using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PeopleSearchApp.Models;

namespace PeopleSearchApp.DAL
{
    public static class ContextIntializer
    {
       public static void Seed(IApplicationBuilder applicationBuilder)
        {
            PersonContext context = applicationBuilder.ApplicationServices.GetService<PersonContext>();

            if (!context.Persons.Any())
            {
                context.Persons.Add(new Person { FirstName = "Gary", LastName = "Garison", Birthday = new DateTime(2000,10,10), ImageURL = "https://randomuser.me/api/portraits/men/93.jpg" });
                context.Persons.Add(new Person { FirstName = "Mary", LastName = "Marison", Birthday = new DateTime(1999,9,9), ImageURL = "https://randomuser.me/api/portraits/men/83.jpg" });
                context.Persons.Add(new Person { FirstName = "Larry", LastName = "Larison", Birthday = new DateTime(1998,8,8), ImageURL = "https://randomuser.me/api/portraits/men/72.jpg" });
                context.Persons.Add(new Person { FirstName = "Harry", LastName = "Harison", Birthday = new DateTime(1997,7,7), ImageURL = "https://randomuser.me/api/portraits/women/81.jpg" });
                context.SaveChanges();
            }
        }
    }
}
