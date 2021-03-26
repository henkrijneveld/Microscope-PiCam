echo "========================================"

rm -rf test
rm -rf test2

echo "1:${PWD}"
mkdir ${PWD}/test

mkdir "${PWD}/test2"

echo "1.1: before pushd"
pushd test > /dev/null
echo "2: after pushd"
mkdir ${PWD}/../test2/fromtest
echo "3:${PWD}"
popd > /dev/null



echo "4: done, now in ${PWD}"

if [[ "${PWD}" =~ home ]];
then
  echo "hashome";
fi

if [[ "${PWD}" =~ var ]];
then
  echo "hasvar"
fi

other=${PWD}
echo $other
