import React from 'react';
import { WORKFLOW_STEPS } from '@/lib/constants';
import StepCard from '@/components/ui/StepCard';
import CustomButton from '@/components/ui/Button';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Automate your DeFi operations with intelligent smart contracts in four simple steps. Deploy, configure, execute, and let automation handle the rest.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.id} className="relative">
              <StepCard step={step} />
              
              {/* Connection Arrow (Desktop only) */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 text-blue-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Connection Arrow (Mobile - Vertical) */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="lg:hidden flex justify-center mt-6 mb-2">
                  <div className="w-6 h-6 text-blue-500 transform rotate-90">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to automate your DeFi operations?
          </p>
          <CustomButton variant="primary" size="lg">
            Get Started
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;