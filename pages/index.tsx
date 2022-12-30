import About from "../components/About";

export default function Home(props:any) {
  return (
    <div className="space-y-14 lg:space-y-24">
      <main className="max-w-4xl mx-auto mt-16 antialiased">
        <About language={props.text}/>
      </main>
    </div>
  )
}