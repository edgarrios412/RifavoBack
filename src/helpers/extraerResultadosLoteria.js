function extraerResultadosLoteria(lotteries, data) {
  const results = lotteries.map((lotteryName) => {
    const lottery = data.find(
      (item) => item.lottery.toUpperCase() === lotteryName.toUpperCase()
    );
    return lottery
      ? {
          lottery: lottery.lottery,
          result: lottery.result,
          series: lottery.series,
        }
      : null;
  });

  return results.filter((result) => result !== null);
}

module.exports = {
  extraerResultadosLoteria,
};
