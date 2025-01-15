# FARM CONNECT Api
Group 17 project

# Api link ==> "https://farm-connect-c2ut.onrender.com"

# Authentication routes

==> POST REQ 
const body = { fullName, email, phoneNumber, farmName, farmLocation, password }

'https://farm-connect-c2ut.onrender.com/api/v1/auth/signup/farmer' ===  route for farmer signup


==> POST REQ 
const body = { fullName, email, phoneNumber, deliveryAddress, password }

'https://farm-connect-c2ut.onrender.com/api/v1/auth/signup/buyer' ===  route for buyer signup

==> POST REQ 
const body = { email, phoneNummber, password }

'https://farm-connect-c2ut.onrender.com/api/v1/auth/login' ===  route for login for both farmer and buyer
