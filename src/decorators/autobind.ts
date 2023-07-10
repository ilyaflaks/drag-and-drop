//autobind decorator (method decorator for submitHandler, can be used on multiple methods and save time)
//used on submitHandler inside ProjectInput class
export function autobind(
  // target: any,
  // methodName: string,
  _: any,
  _2: string, // underscore tells JS that we are aware of these args, we don't need them but we need the arg after
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value; //store the method we originally defined
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
