import * as financeDataWrapper from './financeDataWrapper';

describe("finance data wrapper", () => {

   it("should fetch data object through a given promise", (done) => {
      const expectedOutput = { data: "test finance data" },
         mockedFinanceDataFetcher = Promise.resolve(expectedOutput),
         responseCreator = (response) => ({ news: response.data });

      const wrapper = financeDataWrapper.create({
         financeDataFetcher: mockedFinanceDataFetcher,
         filter: (response) => responseCreator(response)
      });

      wrapper.fetch()
         .then(financeData => {
            financeData.should.deep.equal(responseCreator(expectedOutput));
            done();
         })
         .catch(done);
   });

   it("should throw error when no promise is set for finance data fetcher", (done) => {
      try {
         financeDataWrapper.create({
            financeDataFetcher: (callback) => callback("error")
         });
      } catch (error) {
         done();
      }
   });

   it("should throw error when no function is set for finance filter", (done) => {
      try {
         financeDataWrapper.create({
            financeDataFetcher: Promise.resolve(true),
            filter: undefined
         });
      } catch (error) {
         done();
      }
   });
});