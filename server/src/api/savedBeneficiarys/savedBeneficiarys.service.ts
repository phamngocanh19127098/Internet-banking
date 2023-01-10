import { BadRequestException, Injectable , ConflictException} from '@nestjs/common';
import { CreateSavedBeneficiaryDto, CreateSavedBeneficiaryAffiliatedDto } from './dto/create-saved-beneficiary.dto';
import { UpdateSavedBeneficiaryDto } from './dto/update-saved-beneficiary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, Not } from 'typeorm';
import { SavedBeneficiary } from './entities/savedBeneficiary.entity';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class SavedBeneficiarysService {
  constructor(
    @InjectRepository(SavedBeneficiary)
    private savedBeneficiaryRepository: Repository<SavedBeneficiary>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) { }
  async create(
    createSavedBeneficiaryDto: CreateSavedBeneficiaryDto,
    customerId: number,
  ) {
    try {
      const infoAccount = await this.accountRepository
        .createQueryBuilder('account')
        .leftJoinAndSelect('account.user', 'user')
        .where('account.account_number= :account_number', {
          account_number: createSavedBeneficiaryDto.beneficiaryAccountNumber,
        })
        .getOne();

      if (infoAccount == null) {
        throw new BadRequestException('Tài khoản không tồn tại');
      }

      const exist = await this.savedBeneficiaryRepository.findBy({
        customerId: customerId,
        beneficiaryAccountNumber: createSavedBeneficiaryDto.beneficiaryAccountNumber
      })

      if (exist !== null) {        
        throw new ConflictException('Beneficiary already exist');
      }

      if (!createSavedBeneficiaryDto.beneficiaryNickname) {
        createSavedBeneficiaryDto.beneficiaryNickname =
          infoAccount.user.name || infoAccount.user.username;
      }

      return await this.savedBeneficiaryRepository.save({
        ...createSavedBeneficiaryDto,
        customerId: customerId,
        beneficiaryDefaultName: infoAccount.user.name,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll(userId: number) {
    return this.savedBeneficiaryRepository.findBy({ customerId: userId });
  }


  async findAllInternal(userId: number) {
    // return this.savedBeneficiaryRepository.findBy({ [customerId: userId,] });
    return await this.savedBeneficiaryRepository.find({where: {
      customerId: userId,
      beneficiaryBankId: IsNull()
    }})
  }

  async findAllExternal(userId: number) {
    // return this.savedBeneficiaryRepository.findBy({ [customerId: userId,] });
    return await this.savedBeneficiaryRepository.find({where: {
      customerId: userId,
      beneficiaryBankId: Not(IsNull())
    }})
  }

  findOne(id: number) {
    return this.savedBeneficiaryRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    updateSavedBeneficiaryDto: UpdateSavedBeneficiaryDto,
  ) {
    try {
      const beneficiary: SavedBeneficiary =
        await this.savedBeneficiaryRepository.findOneById(id);

      if (beneficiary == null) {
        throw new BadRequestException('Người thụ hưởng không tồn tại');
      }

      if (updateSavedBeneficiaryDto.beneficiaryAccountNumber) {
        beneficiary.beneficiaryAccountNumber =
          updateSavedBeneficiaryDto.beneficiaryAccountNumber;
      }

      if (updateSavedBeneficiaryDto.beneficiaryDefaultName) {
        beneficiary.beneficiaryDefaultName =
          updateSavedBeneficiaryDto.beneficiaryDefaultName;
      }

      if (!updateSavedBeneficiaryDto.beneficiaryNickname) {
        beneficiary.beneficiaryNickname =
          updateSavedBeneficiaryDto.beneficiaryDefaultName || 'Ẩn Danh';
      } else {
        beneficiary.beneficiaryNickname =
          updateSavedBeneficiaryDto.beneficiaryNickname;
      }
      return await this.savedBeneficiaryRepository.save(beneficiary);
    } catch (e) {
      throw new BadRequestException('Lỗi trong cập nhật người thụ hưởng');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.savedBeneficiaryRepository.findOneBy({
        id: id,
      });

      if (result == null) {
        throw new BadRequestException('Người thụ hưởng không tồn tại');
      }
      return await this.savedBeneficiaryRepository.remove(result);

      // return {
      //     statusCode: 200,
      //     message: `Xoá thành công #${result.beneficiaryNickname} khỏi danh sách thụ hưởng`,
      // }
    } catch (e) {
      throw new BadRequestException('Lỗi trong xoá người thụ hưởng');
      // return{
      //     statusCode: 400,
      //     message: "Lỗi trong xoá người thụ hưởng",
      //     error: e.error
      // }
    }
  }

  async createBenificiatyAffiliated(
    createSavedBeneficiaryDto: CreateSavedBeneficiaryAffiliatedDto,
    customerId: number,
  ) {

    try {
      // const infoAccount = await this.accountRepository
      //   .createQueryBuilder('account')
      //   .leftJoinAndSelect('account.user', 'user')
      //   .where('account.account_number= :account_number', {
      //     account_number: createSavedBeneficiaryDto.beneficiaryAccountNumber,
      //   })
      //   .getOne();

      // if (infoAccount == null) {
      //   throw new BadRequestException('Tài khoản không tồn tại');
      // }

      const exist = await this.savedBeneficiaryRepository.findBy({
        customerId: customerId,
        beneficiaryAccountNumber: createSavedBeneficiaryDto.beneficiaryAccountNumber
      })

      if (exist !== null) { 
        console.log(1)       
        throw new ConflictException('Beneficiary already exist');
      }

      if (!createSavedBeneficiaryDto.beneficiaryNickname) {
        createSavedBeneficiaryDto.beneficiaryNickname =
          createSavedBeneficiaryDto.beneficiaryDefaultName
      }

      return await this.savedBeneficiaryRepository.save({
        ...createSavedBeneficiaryDto,
        customerId: customerId,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
