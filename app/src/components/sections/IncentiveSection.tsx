import React from 'react';

const IncentiveSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Reactive?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Reactive ensures your reactive contracts never fail due to insufficient funds. Whether you're running a DeFi protocol or building reactive applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Users Column */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Protocols</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">24/7 Monitoring</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Continuous monitoring of your reactive contracts. Get alerts before issues become critical.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Zero Downtime</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Automatic replenishment ensures your contracts never go offline due to insufficient funds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Payments</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Pay with ETH, REACT tokens, stablecoins, or credit cards. Choose what works for your team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developers Column */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Developers</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🧩</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Focus on Building</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Stop worrying about contract funding. Focus on building great reactive applications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">💰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reliable Infrastructure</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Build on reliable infrastructure that ensures your contracts are always operational.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🌐</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Integration</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Simple APIs and SDKs to integrate monitoring into your existing development workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Monitoring Flow
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              {/* Contracts */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📄</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Reactive Contracts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Emit callback events</p>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 transform md:rotate-0 rotate-90">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Reactive */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Reactive</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Monitors & replenishes</p>
              </div>

              {/* Arrow */}
              <div className="text-gray-400 transform md:rotate-0 rotate-90">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Funding */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Auto-Funding</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">ETH/REACT/Stablecoins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncentiveSection;