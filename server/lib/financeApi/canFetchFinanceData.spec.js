import canFetchFinanceData from './canFetchFinanceData';

import { defaultNameResponse } from './responseNamer';
import { defaultFilter } from './filter';

describe("finance data wrapper", () => {

   it("should fetch data object through a given promise", (done) => {
      const expectedOutput = { data: "test finance data" },
         mockedFinanceDataFetcher = (output) => Promise.resolve(output),
         responseCreator = (response) => ({ news: response });

      const wrapper = canFetchFinanceData({
         financeDataFetcher: mockedFinanceDataFetcher,
         filter: (response) => response.data,
         nameResponse: responseCreator
      });

      wrapper.fetch(expectedOutput)
         .then(financeData => {
            financeData.should.deep.equal(responseCreator(expectedOutput.data));
            done();
         })
         .catch(done);
   });

   it("should reject data fetching when finance data fetcher does not return a promise", (done) => {
      const expectedOutput = { data: "test finance data" },
         mockedFinanceDataFetcher = (output) => output;

      const wrapper = canFetchFinanceData({
         financeDataFetcher: mockedFinanceDataFetcher,
         filter: defaultFilter,
         nameResponse: defaultNameResponse("test")
      });

      wrapper.fetch(expectedOutput)
         .then(financeData => {
            done("Should not come here because fetch has error");
         })
         .catch(error => done());
   });

   it("should throw error when no function is set for finance data fetcher", (done) => {
      try {
         canFetchFinanceData({
            financeDataFetcher: { error: "error" },
            filter: defaultFilter,
            nameResponse: defaultNameResponse("test")
         });
         done("Should not come here because no function is given");
      } catch (error) {
         done();
      }
   });

   it("should throw error when no function is set for finance filter", (done) => {
      try {
         canFetchFinanceData({
            financeDataFetcher: () => Promise.resolve(true),
            filter: undefined,
            nameResponse: defaultNameResponse("test")
         });
      } catch (error) {
         done();
      }
   });

   it("should throw error when no function is set for response namer", (done) => {
      try {
         canFetchFinanceData({
            financeDataFetcher: () => Promise.resolve(true),
            filter: defaultFilter,
            nameResponse: "error"
         });
      } catch (error) {
         done();
      }
   });
});