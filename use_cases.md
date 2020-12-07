# Use Cases

The dispersive cloud has three core use cases, monitor, analysis, and report. For the management of account information, the dispersive cloud also develops use cases for login/log out and account management.

## Overview

 This is a short overview of our major use cases.
[![Dispersive Cloud Overview](https://res.cloudinary.com/marcomontalbano/image/upload/v1607356000/video_to_markdown/images/youtube--hQN1BFnGPQo-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=hQN1BFnGPQo&feature=youtu.be&ab_channel=TingxinXie "Dispersive Cloud Overview")

### Script

When an outsider uses the employee account to login into the company website,

Our biometric algorithm can identify and record the outsider's information as a threat.

Security analysts can check threat details or download the report of threats for further investigation.

There are all of our features.

[Website](https://master.d1qygtr349aphw.amplifyapp.com/monitor/dashboard)

## Login/logout

[![Login feature](https://res.cloudinary.com/marcomontalbano/image/upload/v1607359851/video_to_markdown/images/youtube--RU28-We0hwY-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/RU28-We0hwY "Login feature")

### Script
For collecting the mouse movement data for real-time analysis, the dispersive cloud simulates a standard work environment to collect user mouse movement information.
 
In our user pool at Cognito, there is previous information for current employees. 
 
Employee can create an account with their email address.

When a new employee signs in to their account with their email, their information will dynamically record in our user pool.

[The standard work environment](https://master.d3fvo5w7ve6x0b.amplifyapp.com/).

[User pool](https://ca-central-1.console.aws.amazon.com/cognito/users/?region=ca-central-1#/pool/ca-central-1_zLwpgHsKj/users?_k=coymms)

## Monitor

[![Monitor feature](https://res.cloudinary.com/marcomontalbano/image/upload/v1607363506/video_to_markdown/images/youtube--sLtrJbcXXxc-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=sLtrJbcXXxc&feature=youtu.be&ab_channel=TingxinXie "Monitor feature")

### Script
All employees’ information will store in the cloud database. 
 
When a new employee login into the company website, our system will build an employee personal biometrics behavior profile based on their unique mouse movement. 

Normally, it takes a strand workday to collect the mouse movement to generate a biometrics profile. For this demonstration, we shortened the profile generation process into only 5 actions.
 
As you can see, when an employee uses the company website, their mouse movement will automatically cover into three biometrics parameters, angle of curvature, curvature distance and the direction of movement, with the time and IP address of the threat.

The recorded information will automatically compare with the distribution of previous biometrics behavior data to identify the account leak threat.

[The standard work environment](https://master.d3fvo5w7ve6x0b.amplifyapp.com/auth).

[Database](https://ca-central-1.console.aws.amazon.com/dynamodb/home?region=ca-central-1#tables:selected=aws-app-SampleTable-1L8N9XTLLXIRZ;tab=items)

## Analysis

[![Analysis feature](https://res.cloudinary.com/marcomontalbano/image/upload/v1607375911/video_to_markdown/images/youtube--c_DXg2vcJOo-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/c_DXg2vcJOo "Analysis feature")

### Script
WWhen the tier1 security analyst login into the dashboard of the security system.

The analyst can check all alerts that generate by our dynamic cloud database. 

The analyst can investigate on the alert details. 

In the alert details, the analyst will have an overview of the status of abnormal behavior and distribution of historical biometric behavior by our three biometrics parameters. 

Analysts also can investigate on each parameter for further details.

[Analysis dashbroad](https://master.d1qygtr349aphw.amplifyapp.com/monitor/dashboard)

## Report

[![Report feature](https://res.cloudinary.com/marcomontalbano/image/upload/v1607376072/video_to_markdown/images/youtube--oZxWTlQCb_Q-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/oZxWTlQCb_Q "Report feature")

### Script
Dispersive cloud develops a reporting system for the tier1 analyst to generate the report to the security manager about the performance by using our security system.

The analyst can check and download the threats detected on different platforms with multiple periods: the historical overview, daily, weekly, and monthly reports. 

[Report page](https://master.d1qygtr349aphw.amplifyapp.com/monitor/reports)

## User management

[![User management feature](https://res.cloudinary.com/marcomontalbano/image/upload/v1607377128/video_to_markdown/images/youtube--WvHMgwKfPmM-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/WvHMgwKfPmM "User management feature")

### Script
In the user manage selection, the analyst can add or delete the monitored employee account. 

Once the employee account is removed from user manage selection, its corresponding alerts will also delete from the dashboard.

[User manage page](https://master.d1qygtr349aphw.amplifyapp.com/monitor/user)
