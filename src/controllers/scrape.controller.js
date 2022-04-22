import fs from "fs";
import puppeteer from "puppeteer";

export const scrape = async (req, res) => {
  const url =
    "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";
  const browser = await puppeteer.launch({ headless: true }); //browser initiate
  const page = await browser.newPage(); // opening a new blank page
  await page.goto(url);

  const theadList = await page.evaluate(() => {
    const headers = document.querySelectorAll(".table thead tr th");
    const tRows = {};
    headers.forEach((th, index) => {
      tRows[index] = th.textContent;
    });

    const response = [];
    let tableBody = document.querySelectorAll(".table tbody tr");
    tableBody.forEach((t) => {
      const bRow = {};
      t.querySelectorAll("td").forEach((td, index) => {
        bRow[tRows[index]] = td.textContent;
      });
      response.push(bRow);
    });
    return response;
  });

  browser.close();

  fs.writeFile(
    "database/scraping.json",
    JSON.stringify(theadList, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved Successfully!");
      }
    }
  );

  res.json(theadList);
};
