import updateCommand from './update';
import commitCommand from './commit';



const ucomCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUcomishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await commitCommand(packageName, configurationFile);

    console.log(`\n\tUcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}


export default ucomCommand;
