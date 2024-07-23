import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-row justify-start m-8 p-8'>
      <section className='min-h-screen w-1/3 m-2 p-2 justify-start shadow-lg bg-neutral-800'>
        <h1 className='text-xl font-bold m-4'>Filters</h1>
        <div className='m-4'>
          <h2 className='mt-4'>Country</h2>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value=''></option>
            <option value='usa'>United States of America</option>
            <option value='mexico'>Mexico</option>
            <option value='canada'>Canada</option>
          </select>
          <h2 className='mt-4'>Comment Activity Trend</h2>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value=''></option>
            <option value='higher'>Higher</option>
            <option value='lower'>Lower</option>
            <option value='neutral'>Neutral</option>
          </select>
        </div>
      </section>

      <section className='min-h-screen flex w-2/3 m-2 p-2 justify-end shadow-lg bg-neutral-800'>
        <div className='w-4 m-4'>
          <select className='block w-full p-2 border bg-black border-gray-300 rounded mb-4'>
            <option value='sortby'>Sort By</option>
            <option value='member'>Member Since</option>
            <option value='activity'>Comment Activity</option>
          </select>
        </div>
      </section>
    </main>
  );
}
