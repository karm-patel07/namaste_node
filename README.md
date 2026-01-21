# namaste_node

## AuthApi

/signup -->http://localhost:3000/signup (post)
/login --> http://localhost:3000/login (post)
/logout --> http://localhost:3000/logout (post)

## profile api

/profile/view -->http://localhost:3000/profile/view (get)
/profile/edit -->http://localhost:3000/profile/edit (patch)

## requestRouter api

Use prefix --> /Api

status:interested,ignore -->http://localhost:3000/Api/request/send/interested/695f6d087852753eab6c645a (post api)

status:accepted,rejected -->http://localhost:3000/Api/request/review/accepted/6960bf39ba48c73ef14dfe56 (post api)

/request/send/:status/:toUserId

## userRouter api

/user/request/received -->http://localhost:3000/user/request/received (get)

/user/connection -->http://localhost:3000/user/connection (get)

/feed -->http://localhost:3000/feed?page=2&limit=2 (get)
