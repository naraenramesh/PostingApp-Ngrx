import { createAction, props } from "@ngrx/store";

export const login=createAction('[User]Login',
props<{
username:String,
password:String,
token:String
}>())

export const signup=createAction('[User]Signup',
props<{username:String,password:String}>())

export const logintoDB=createAction('[User]LogintoDB',props<{
username:String,password:String
}>())

export const autologin=createAction('[User]Auto Login')

export const autologout=createAction('[User] Auto Logout');

export const logout=createAction('[User]Logout')
