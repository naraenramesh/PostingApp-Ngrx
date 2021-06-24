import * as fromPost from "../post/post-store/post-reducer"
import * as fromAuth from "../auth/auth-store/auth-reducer"

export interface AppState{
post:fromPost.State,
auth:fromAuth.AuthState
}
