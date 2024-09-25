/* eslint-disable prettier/prettier */
import React from 'react';

const ProjectSection = () => {
  return (
    <section>
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center mt-16 mb-8">
          <span className='text-blue-500'>[</span> Projetos <span className='text-blue-500'>]</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Projeto 1</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              fringilla, justo ac fermentum pulvinar, felis libero aliquet
              tortor, nec facilisis purus justo ut nunc.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Projeto 2</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              fringilla, justo ac fermentum pulvinar, felis libero aliquet
              tortor, nec facilisis purus justo ut nunc.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Projeto 3</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              fringilla, justo ac fermentum pulvinar, felis libero aliquet
              tortor, nec facilisis purus justo ut nunc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
