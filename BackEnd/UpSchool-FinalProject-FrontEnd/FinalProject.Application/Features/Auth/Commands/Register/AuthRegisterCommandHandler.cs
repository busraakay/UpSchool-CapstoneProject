﻿using FinalProject.Application.Common.Interfaces;
using FinalProject.Application.Common.Models.Auth;
using FinalProject.Domain.Identity;
using MediatR;

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Application.Features.Auth.Commands.Register
{
    public class AuthRegisterCommandHandler : IRequestHandler<AuthRegisterCommand, AuthRegisterDto>
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IJwtService _jwtService;

        public AuthRegisterCommandHandler(IAuthenticationService authenticationService, IJwtService jwtService)
        {
            _authenticationService = authenticationService;
            _jwtService = jwtService;
        }

        public async Task<AuthRegisterDto> Handle(AuthRegisterCommand request, CancellationToken cancellationToken)
        {
            var createUserDto = new CreateUserDto(request.FirstName,request.LastName,request.Email,request.Password);
            var userId = await _authenticationService.CreateUserAsync(createUserDto, cancellationToken);
            var emailToken = await _authenticationService.GenerateEmailActivationTokenAsync(userId, cancellationToken);
            var fullName = $"{request.FirstName} {request.LastName}";
            var jwtDto = _jwtService.Generate(userId, request.Email, request.FirstName, request.LastName);

            return new AuthRegisterDto(request.Email, fullName, jwtDto.AccessToken);
        }
    }
}
