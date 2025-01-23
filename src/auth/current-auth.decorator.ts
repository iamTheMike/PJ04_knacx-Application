/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

//function to get the current user from the request object
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const getCurrentUserByContext = (context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
}


export const CurrentAuth = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
}
)