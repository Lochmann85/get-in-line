import * as financeDataWrapper from './financeDataWrapper';

describe("finance data wrapper", () => {

   it("should fetch data object through a given promise", (done) => {
      const expectedOutput = "test finance data",
         mockedFinanceDataFetcher = Promise.resolve(expectedOutput);

      const wrapper = financeDataWrapper.create({
         financeDataFetcher: mockedFinanceDataFetcher
      });

      wrapper.fetch()
         .then(financeData => {
            financeData.should.equal(expectedOutput);
            done();
         })
         .catch(done);
   });

   it("should reject with error when no promise is set for finance data fetcher", (done) => {
      try {
         financeDataWrapper.create({
            financeDataFetcher: (callback) => callback("error")
         });
      } catch (error) {
         done();
      }
   });
});