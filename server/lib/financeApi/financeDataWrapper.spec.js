import * as financeDataWrapper from './financeDataWrapper';

describe("finance data wrapper", () => {

   it("should fetch data object through a given promise", (done) => {
      const expectedOutput = { data: "test finance data" },
         mockedFinanceDataFetcher = (output) => Promise.resolve(output),
         responseCreator = (response) => ({ news: response.data });

      const wrapper = financeDataWrapper.create({
         financeDataFetcher: mockedFinanceDataFetcher,
         filter: (response) => responseCreator(response)
      });

      wrapper.fetch(expectedOutput)
         .then(financeData => {
            financeData.should.deep.equal(responseCreator(expectedOutput));
            done();
         })
         .catch(done);
   });

   it("should reject data fetching when finance data fetcher does not return a promise", (done) => {
      const expectedOutput = { data: "test finance data" },
         mockedFinanceDataFetcher = (output) => output;

      const wrapper = financeDataWrapper.create({
         financeDataFetcher: mockedFinanceDataFetcher,
         filter: (response) => response
      });

      wrapper.fetch(expectedOutput)
         .then(financeData => {
            done("Should not come here because fetch has error");
         })
         .catch(error => done());
   });

   it("should throw error when no function is set for finance data fetcher", (done) => {
      try {
         financeDataWrapper.create({
            financeDataFetcher: { error: "error" },
            filter: () => { }
         });
         done("Should not come here because no function is given");
      } catch (error) {
         done();
      }
   });

   it("should throw error when no function is set for finance filter", (done) => {
      try {
         financeDataWrapper.create({
            financeDataFetcher: () => Promise.resolve(true),
            filter: undefined
         });
      } catch (error) {
         done();
      }
   });
});