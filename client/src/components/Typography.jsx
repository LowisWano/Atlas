/* eslint-disable react/prop-types */
export function H1(props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  )
}

export function P(props) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      {props.children}
    </p>
  )
}

export function H4(props) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props.children}
    </h4>
  )
}


