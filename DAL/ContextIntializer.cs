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
                
                context.SaveChanges();
            }
        }
    }
}
