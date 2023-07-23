﻿using FinalProject.Domain.Common;
using FinalProject.Domain.Entities;
using MediatR;

namespace FinalProject.Application.Features.Products.Commands.Add
{
    public class ProductAddCommand : IRequest<Response<Guid>>
    {
        public Guid OrderId { get; set; }

        public string Name { get; set; }

        public string Picture { get; set; }

        public bool IsOnSale { get; set; }

        public decimal Price { get; set; }

        public decimal SalePrice { get; set; }
    }
}
