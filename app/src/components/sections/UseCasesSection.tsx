import React from 'react';
import { USE_CASES } from '@/lib/constants';
import UseCaseCard from '@/components/ui/UseCaseCard';
import CustomButton from '@/components/ui/Button';

const UseCasesSection: React.FC = () => {
  return (
    <section id="use-cases" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how SnipArk transforms DeFi operations through intelligent automation. From yield farming to algorithmic trading, unlock the full potential of decentralized finance.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Automate Your DeFi Strategy?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a yield farmer, liquidity provider, or algorithmic trader, SnipArk empowers you to maximize returns through intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton variant="primary" size="lg">
              Start Automating
            </CustomButton>
            <CustomButton variant="outline" size="lg">
              View Documentation
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;