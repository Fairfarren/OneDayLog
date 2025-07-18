rm -rf ./gitee
mkdir gitee
cd gitee
git clone git@gitee.com:fairfarren/fast-book-interface-feedback.git
cd ../
cp project.tt.json ./gitee/fast-book-interface-feedback
cp project.private.config.json ./gitee/fast-book-interface-feedback
cp project.config.json ./gitee/fast-book-interface-feedback
cp -r dist ./gitee/fast-book-interface-feedback
cd ./gitee/fast-book-interface-feedback
git config user.email lykwow@live.com
git add -A
git commit -m ':rocket:'
git push -f
cd ../../
rm -rf gitee
