import Link from "next/link"

export default function TooManyReqs() {
  return (
    <>
      <p>Error: Too Many Requests</p>
      <Link href="/">Go back</Link>
    </>
  )
}
