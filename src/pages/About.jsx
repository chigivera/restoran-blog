// bloc de navigation.
// bloc de Qui sommes-nous.
import React from 'react';

const About = () => {
    return (
        <div className='about m-16'>
            <ul>
                <li className="flex">
                    <ul className="flex w-full justify-between">
                        <li className='p-10'>

                    <span className='text-6xl font-bold'>Who we are</span>
                        </li>
                        <li className='p-10 '>
                    We bring equal dedication and commitment to every project, whether it's residential, commercial, or public space design.

                        </li>
                    </ul>


                </li>
                <li className='p-10'>
    <img className="rounded-t-lg object-cover w-full h-60" src="https://placehold.co/600x400" alt="" />
</li>
        <li className='p-10'>
            <ul className='flex w-full justify-between'>
                <li className='w-2/4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati optio, commodi enim iusto quas, animi aliquid atque architecto adipisci minus deleniti quisquam ipsum, labore saepe doloribus ducimus sapiente molestiae consectetur.
                </li>
                <li>
                <img className="rounded-t-lg object-cover w-60 h-60" src="https://placehold.co/600x400" alt="" />

                </li>
                <li>
                <img className="rounded-t-lg object-cover w-60 h-60" src="https://placehold.co/600x400" alt="" />

                </li>
            </ul>
        </li>
        <li className='flex w-full justify-center'>
            <span className="text-4xl font-bold">
                Meet our Team
            </span> 
        </li>
        <li className='p-10'>
        <ul className=' flex w-full justify-between'>
        <li className=''>
                <img className="rounded-t-lg object-cover w-60 h-60" src="https://placehold.co/600x400" alt="" />

                </li>
                <li>
                <img className="rounded-t-lg object-cover w-60 h-60" src="https://placehold.co/600x400" alt="" />

                </li>
                <li>
                <img className="rounded-t-lg object-cover w-60 h-60" src="https://placehold.co/600x400" alt="" />

                </li>
        </ul>
        </li>
            </ul>
            {/* = */}
        </div>
    );
}

export default About;
